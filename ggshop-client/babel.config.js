module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui", 
        // 组件样式
        "styleLibraryName": "theme-chalk" 
      }
    ]
  ]
}
