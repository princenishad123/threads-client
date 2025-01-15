
import { keepTheme } from "keep-react/keepTheme";

const config = {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
}

export default keepTheme(config);


