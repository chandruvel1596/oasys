module.exports = {
    "ignorePatterns": ["node_modules/", "dist/"],
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "module" // Change this to "module"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "project": "./tsconfig.json" // Path to your tsconfig.json
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        
        // Add any specific rules you want to enforce
    }
   
    
};
