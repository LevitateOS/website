import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { TableBlock } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"

export function TableBlockRenderer({ table }: { table: TableBlock }) {
	return (
		<Table className="mb-4">
			<TableHeader>
				<TableRow>
					{table.headers.map((header, i) => (
						<TableHead key={i}>
							<InlineContentRenderer content={header} />
						</TableHead>
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
								<InlineContentRenderer content={cell} />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
