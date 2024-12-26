import { ButtonProps } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SidebarTriggerProps extends ButtonProps {
  iconOpen?: ReactNode
  iconClosed?: ReactNode
}

export interface SidebarProps {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  className?: string
  children?: ReactNode
}

export interface SidebarMenuItemProps {
  icon?: LucideIcon
  title: string
  path?: string
  children?: ReactNode
}