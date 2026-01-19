import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { TableBlock } from "@levitate/docs-content"

export function TableBlockRenderer({ table }: { table: TableBlock }) {
	return (
		<Table className="mb-4">
			<TableHeader>
				<TableRow>
					{table.headers.map((header, i) => (
						<TableHead key={i}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{table.rows.map((row, i) => (
					<TableRow key={i}>
						{row.map((cell, j) => (
							<TableCell
								key={j}
								className={j === table.monospaceCol ? "font-mono" : ""}
							>
								{cell}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
