export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/overview", "/dashboard/task", "/dashboard/new", "/dashboard/profile"] }