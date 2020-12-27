import tokensParser from "./tokensParser";
import tokens from "../../testData/tokens";
import TokensFormat from "../../consts/TokensFormat";

describe("tokensParser", () => {
  describe("parse", () => {
    it(`returns CSS tokens when tokensFormat is ${TokensFormat.CSS}`, () => {
      const cssTokens = tokensParser.parse(tokens, TokensFormat.CSS);
      expect(cssTokens).toEqual(
        `:root {\n  --color-dark: #222222;\n  --color-yellow: #ccc000;\n  --font-size-base: 16px;\n  --font-size-lg: 42px;\n  --border-radius-base: 4px;\n  --border-radius-circle: 50px;\n}`
      );
    });

    it(`returns SCSS tokens when tokensFormat is ${TokensFormat.SCSS}`, () => {
      const scssTokens = tokensParser.parse(tokens, TokensFormat.SCSS);
      expect(scssTokens).toEqual(
        `$color-dark: #222222;\n$color-yellow: #ccc000;\n$font-size-base: 16px;\n$font-size-lg: 42px;\n$border-radius-base: 4px;\n$border-radius-circle: 50px;`
      );
    });

    it(`returns JSON tokens when tokensFormat is ${TokensFormat.JSON}`, () => {
      const jsonTokens = tokensParser.parse(tokens, TokensFormat.JSON);
      const expectedTokens = {
        "color-dark": "#222222",
        "color-yellow": "#ccc000",
        "font-size-base": "16px",
        "font-size-lg": "42px",
        "border-radius-base": "4px",
        "border-radius-circle": "50px",
      };

      expect(jsonTokens).toEqual(JSON.stringify(expectedTokens, null, 2));
    });
  });
});
