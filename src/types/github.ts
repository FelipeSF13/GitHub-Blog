export interface GitHubUser {
  login: string; name: string | null; avatar_url: string; bio: string | null
  followers: number; html_url: string; company: string | null
}
export interface GitHubIssue {
  number: number; title: string; body: string | null; html_url: string
  created_at: string; comments: number; user: {login:string} | null; pull_request?: object
}
export interface IssuePage {items: GitHubIssue[]; total_count: number}
