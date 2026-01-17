import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/layout";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/docs/manual-install")({
  component: ManualInstallPage,
});

function ManualInstallPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-6">Manual Installation Guide</h1>
      <p className="text-muted-foreground mb-8">
        This guide is for users installing LevitateOS <strong>without</strong> the LLM assistant.
        If you have the LLM variant, see the <a href="/docs/install" className="text-primary hover:underline">Installation Guide</a> instead.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Boot the ISO</h2>
        <p className="text-muted-foreground mb-4">
          After booting from the ISO, you'll be dropped into a root shell. The live environment
          has all the tools you need to partition, format, and install.
        </p>
        <CodeBlock language="bash">{`# You'll see a prompt like:
root@levitate-live ~ #`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Identify Your Disk</h2>
        <p className="text-muted-foreground mb-4">
          List available disks and identify your target:
        </p>
        <CodeBlock language="bash">{`lsblk -d -o NAME,SIZE,MODEL

# Example output:
# NAME    SIZE MODEL
# sda     500G Samsung SSD
# nvme0n1 1T   WD Black SN850`}</CodeBlock>
        <p className="text-muted-foreground mt-4">
          In this guide, we'll use <code className="bg-muted px-1 rounded">/dev/sda</code>.
          Replace with your actual device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Partition the Disk</h2>
        <p className="text-muted-foreground mb-4">
          Create a GPT partition table with EFI and root partitions:
        </p>
        <CodeBlock language="bash">{`# Wipe existing partition table
wipefs -a /dev/sda

# Create partitions with fdisk
fdisk /dev/sda

# In fdisk:
# g        - Create GPT partition table
# n        - New partition (EFI)
#   1      - Partition number
#   [enter] - Default first sector
#   +512M  - 512MB for EFI
# t        - Change type
#   1      - EFI System
# n        - New partition (root)
#   2      - Partition number
#   [enter] - Default first sector
#   [enter] - Use remaining space
# w        - Write and exit`}</CodeBlock>
        <p className="text-muted-foreground mt-4">
          Or use a single command with <code className="bg-muted px-1 rounded">parted</code>:
        </p>
        <CodeBlock language="bash">{`parted /dev/sda --script \\
  mklabel gpt \\
  mkpart ESP fat32 1MiB 513MiB \\
  set 1 esp on \\
  mkpart root ext4 513MiB 100%`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Format Partitions</h2>
        <CodeBlock language="bash">{`# Format EFI partition as FAT32
mkfs.fat -F32 /dev/sda1

# Format root partition as ext4
mkfs.ext4 /dev/sda2`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Mount Filesystems</h2>
        <CodeBlock language="bash">{`# Mount root
mount /dev/sda2 /mnt

# Create and mount EFI
mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Install Base System</h2>
        <p className="text-muted-foreground mb-4">
          Extract the base system to the target:
        </p>
        <CodeBlock language="bash">{`# Copy base system
levitate-install --target /mnt

# This installs:
# - Linux kernel
# - Init system (systemd or runit)
# - libc (glibc or musl)
# - GNU coreutils
# - levitate package manager`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Generate fstab</h2>
        <CodeBlock language="bash">{`# Generate fstab from current mounts
genfstab -U /mnt >> /mnt/etc/fstab

# Verify it looks correct
cat /mnt/etc/fstab`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Chroot and Configure</h2>
        <CodeBlock language="bash">{`# Enter the new system
arch-chroot /mnt

# Set timezone
ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime
hwclock --systohc

# Set hostname
echo "levitate" > /etc/hostname

# Set root password
passwd

# Create your user
useradd -m -G wheel -s /bin/bash vince
passwd vince

# Enable sudo for wheel group
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Install Bootloader</h2>
        <p className="text-muted-foreground mb-4">
          Install and configure systemd-boot (for systemd variant) or GRUB:
        </p>

        <h3 className="text-xl font-medium mb-3">systemd-boot (systemd variant)</h3>
        <CodeBlock language="bash">{`# Install systemd-boot
bootctl install

# Create loader config
cat > /boot/loader/loader.conf << 'EOF'
default levitate.conf
timeout 3
editor no
EOF

# Create boot entry
cat > /boot/loader/entries/levitate.conf << 'EOF'
title   LevitateOS
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=/dev/sda2 rw
EOF`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">GRUB (runit variant)</h3>
        <CodeBlock language="bash">{`# Install GRUB
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=LevitateOS

# Generate config
grub-mkconfig -o /boot/grub/grub.cfg`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Exit and Reboot</h2>
        <CodeBlock language="bash">{`# Exit chroot
exit

# Unmount
umount -R /mnt

# Reboot
reboot`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Post-Installation</h2>
        <p className="text-muted-foreground mb-4">
          After rebooting, log in and install the desktop environment:
        </p>
        <CodeBlock language="bash">{`# Install Sway desktop stack
levitate desktop

# Or install individual packages
levitate install firefox foot waybar`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>

        <h3 className="text-xl font-medium mb-3">Boot fails with "no bootable device"</h3>
        <p className="text-muted-foreground mb-4">
          The EFI partition may not be properly configured. Boot from the ISO again and verify:
        </p>
        <CodeBlock language="bash">{`# Check EFI partition is set correctly
fdisk -l /dev/sda | grep EFI

# Reinstall bootloader
mount /dev/sda2 /mnt
mount /dev/sda1 /mnt/boot/efi
arch-chroot /mnt
bootctl install  # or grub-install`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">Network not working</h3>
        <CodeBlock language="bash">{`# For systemd variant
systemctl enable --now systemd-networkd
systemctl enable --now systemd-resolved

# Check status
networkctl status`}</CodeBlock>
      </section>
    </DocsLayout>
  );
}
