import { render } from "@testing-library/react"
import App from "./App"


describe("App.jsx", () => {
    test("renders without errors", () => {
        const { container } = render(<App/>)

        expect(container).toBeInTheDocument()
    })
})