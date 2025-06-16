import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicornRecommended from "eslint-plugin-plugin:unicorn/recommended";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("airbnb-base", "prettier"),

    plugins: {
        "simple-import-sort": simpleImportSort,
        "plugin:unicorn/recommended": pluginUnicornRecommended,
    },

    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",

        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            mjs: "never",
            jsx: "never",
            tsx: "never",
            ts: "never",
        }],

        "import/prefer-default-export": "off",

        "import/no-extraneous-dependencies": ["error", {
            devDependencies: ["**/test/**"],
        }],

        "no-param-reassign": ["error", {
            props: true,
            ignorePropertyModificationsFor: ["self"],
        }],
    },
}]);
