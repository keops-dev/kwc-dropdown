//@ts-expect-error
import cssText from "bundle-text:./default.css"
import { Alignment, Coords, Placement, Side } from "./types"

export class Dropdown extends HTMLElement {
  shadow: ShadowRoot
  buttonSlot: HTMLSlotElement
  button: HTMLElement
  menuSlot: HTMLSlotElement
  menu: HTMLElement
  container: HTMLDivElement

  /**
   * Position of the dropdown menu relative to the button
   */
  position: Placement
  /**
   * the height of menu element
   */
  menuHeight: number

  constructor() {
    super()

    const template = document.createElement("template")
    template.innerHTML = `
        <style>
            :host {
                display: block;
                position: relative;
            }         

            #container {
                position: absolute;
                zindex: 10;
                overflow: hidden;
                white-space: nowrap;
            }
        </style>

        <slot name="button" id="button">Dropdown button</slot>
        <div id="container">
            <slot name="menu" id="menu">
                Dropdown content
            </slot>
        </div>
        `

    // shadow DOM
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(template.content.cloneNode(true))

    // default style
    if (this.getAttribute("defaultStyle") === "true") {
      const templateStyle = document.createElement("style")
      templateStyle.innerText = `
        #container {
          background-color: #fff;
          padding: 0.25rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
      `
      this.shadow.appendChild(templateStyle)

      const style = document.createElement("style")
      style.innerText = cssText
      // outside the shadow Dom so it can be applied to slots elements
      this.appendChild(style)
    }

    // elements
    this.buttonSlot = this.shadow.getElementById("button") as HTMLSlotElement
    this.menuSlot = this.shadow.getElementById("menu") as HTMLSlotElement

    this.button = this.buttonSlot.assignedElements()[0] as HTMLElement
    this.container = this.shadow.getElementById("container") as HTMLDivElement
    this.menu = this.menuSlot.assignedElements()[0] as HTMLElement

    // properties
    this.position = (this.getAttribute("position") as Placement) ?? "top"

    // keep menu height in memory
    this.menuHeight = this.container.offsetHeight
    // set dropdown coords from position given
    this.setCoordsFromPosition(this.position)
    // after this, we can hide the menu container
    this.container.hidden = true

    // events
    this.buttonSlot.addEventListener(
      "click",
      this.onButtonClick.bind(this),
      false
    )
    this.handleClickOut = this.handleClickOut.bind(this)
  }

  getCoordsFromPosition(position: Placement) {
    const ref = this.button.getBoundingClientRect()
    const dd = this.container.getBoundingClientRect()

    const side = position.split("-")[0] as Side
    const alignment = position.split("-")[1] as Alignment
    const mainAxis = ["top", "bottom"].includes(side) ? "x" : "y"
    const length = mainAxis === "x" ? "width" : "height"
    const commonX = ref.width / 2 - dd.width / 2
    const commonY = ref.height / 2 - dd.height / 2
    const commonAlign = ref[length] / 2 - dd[length] / 2

    let coords: Coords

    switch (side) {
      case "top":
        coords = { x: commonX, y: -dd.height }
        break
      case "bottom":
        coords = { x: commonX, y: ref.height }
        break
      case "right":
        coords = { x: ref.width, y: commonY }
        break
      case "left":
        coords = { x: -dd.width, y: commonY }
        break
      default:
        coords = { x: commonX, y: commonY }
    }

    switch (alignment) {
      case "start":
        coords[mainAxis] -= commonAlign
        break
      case "end":
        coords[mainAxis] += commonAlign
        break
    }

    return coords
  }

  setCoordsFromPosition(position: Placement) {
    const { x, y } = this.getCoordsFromPosition(position)

    Object.assign(this.container.style, { left: `${x}px`, top: `${y}px` })
  }

  onButtonClick(): void {
    this.container.hidden = false
    this.container
      .animate([{ maxHeight: "0px" }, { maxHeight: `${this.menuHeight}px` }], {
        duration: 100,
        fill: "forwards",
      })
      .finished.then(() => {
        document.addEventListener("click", this.handleClickOut, false)
      })
      .catch((error) => console.error(error))
  }

  handleClickOut(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target != null && target !== this.menu && !this.menu.contains(target)) {
      this.container
        .animate(
          [{ maxHeight: `${this.menuHeight}px` }, { maxHeight: "0px" }],
          {
            duration: 100,
            fill: "forwards",
          }
        )
        .finished.then(() => {
          this.container.hidden = true
          document.removeEventListener("click", this.handleClickOut, false)
        })
        .catch((error) => console.error(error))
    }
  }
}

customElements.define("kwc-dropdown", Dropdown)

export function createDropdown(): Dropdown {
  return document.createElement("kwc-dropdown") as Dropdown
}
