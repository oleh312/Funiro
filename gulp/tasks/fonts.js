import fs from 'fs'
import ttf2woff2 from 'gulp-ttf2woff2'
import ttf2woff from 'gulp-ttf2woff'

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.src.fonts}*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(ttf2woff())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.src.fonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
  fs.readdir(app.path.build.fonts, (err, files) => {
    if (err) {
      console.log(err)
    }
    if (files) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', (err) => {
          if (err) {
            console.log(err)
          }
          let newFileOnly
          files.forEach(file => {
            const fileName = file.split('.')[0]
            if (fileName !== newFileOnly) {
              const fontFamilyName = fileName.split('-')[1].toLowerCase()
              let fontWeight = 400
              let fontStyle = 'normal'
              if (fontFamilyName.startsWith('thin')) {
                fontWeight = 100
                if (fontFamilyName === 'thinitalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('light')) {
                fontWeight = 300
                if (fontFamilyName === 'lightitalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('regular')) {
                fontWeight = 400
                if (fontFamilyName === 'regularitalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('medium')) {
                fontWeight = 500
                if (fontFamilyName === 'mediumitalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('bold')) {
                fontWeight = 700
                if (fontFamilyName === 'bolditalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('black')) {
                fontWeight = 900
                if (fontFamilyName === 'blackitalic') {
                  fontStyle = 'italic'
                }
              } else if (fontFamilyName.startsWith('italic')) {
                fontStyle = 'italic'
              }
              fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fileName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2"), url("../fonts/${fileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, (err) => {
                if (err) {
                  console.log(err)
                }
              })
              newFileOnly = fileName
            }
          })
        })
      } else {
        console.log('---File scss/fonts.scss already exist. to update remove him---')
      }
    }
  })
  return app.gulp.src(`${app.path.srcFolder}`)
}