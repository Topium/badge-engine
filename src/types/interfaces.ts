export interface BadgeData {
    fileUrl: string,
    imageX: number,
    imageY: number,
    scale: number,
    amount: number,
}

export interface ListBadgeData {
    badge_id: number,
    badge_name: string,
    badge_url: string,
    id: number,
    scale: string,
    x_pos: number,
    y_pos: number
  }

  export type ErrorResponse = {
    msg: string
}