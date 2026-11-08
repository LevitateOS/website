import { llmsIndex } from "../lib/llms"

export function GET(): Response {
	return new Response(llmsIndex(), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
