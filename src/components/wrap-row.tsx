import cn from "../lib/class-names"
import IChildrenProps from "../interfaces/children-props"
import BaseRow from "./base-row"
import React from "react"

const WrapRow = ({ className = "", children }: IChildrenProps) => (
  <BaseRow className={cn("flex-wrap", className)}>{children}</BaseRow>
)

export default WrapRow
