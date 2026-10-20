import { Bot, CalendarDays, ChartNoAxesColumn, House, MessagesSquare, Settings2, Users, Wallet, type LucideIcon } from "lucide-react"
export interface NavItem { href:string; label:string; icon:LucideIcon; badge?:"unread"|"agent" }
export const NAV:{group:string;items:NavItem[]}[]=[
  {group:"Daily",items:[{href:"/",label:"Today",icon:House},{href:"/agenda",label:"Schedule",icon:CalendarDays},{href:"/bandeja",label:"Inbox",icon:MessagesSquare,badge:"unread"},{href:"/clientes",label:"Clients",icon:Users}]},
  {group:"Finance",items:[{href:"/caja",label:"Cash",icon:Wallet},{href:"/finanzas",label:"Finance",icon:ChartNoAxesColumn}]},
  {group:"Automation",items:[{href:"/agente",label:"AI Agent",icon:Bot,badge:"agent"}]},
]
export const SETTINGS_ITEM:NavItem={href:"/ajustes",label:"Settings",icon:Settings2}
export function isActive(pathname:string,href:string){return href==="/"?pathname==="/":pathname===href||pathname.startsWith(href+"/")}
