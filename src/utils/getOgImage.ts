import type { SatoriOptions } from "satori";
import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp"

/**
 * @param title hogehoge
 * @param debug ex. import.meta.env.DEV
 * @returns
 */
export async function getOgImage(title: string, debug?: boolean){
  const notSansJp = await readFile("./src/pages/api/og/_fonts/noto-sans-jp-japanese-700-normal.woff")

  const options: SatoriOptions = {
    debug: debug ?? false,
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: notSansJp,
        style: "normal",
        weight: 700
      },
    ],
  }
  const titleLength = title?.length ?? 0;
  const maxWidth = titleLength <= 60 ? '50%' : titleLength <= 75 ? '60%' : '70%'

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "Noto Sans JP, sans-serif",
          color: 'rgb(255 255 255)',
          backgroundColor: 'rgb(26 32 44)',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                height: '75%',
                maxWidth
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      wordBreak: 'auto-phrase',
                    },
                    children: title
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: "center",
                      columnGap: 16,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: 64,
                            height: 64,
                            border: "1px solid transparent",
                            borderRadius: "30% 70% 59% 41% / 30% 26% 74% 70%",
                            backgroundImage: "linear-gradient(to top right,rgb(0, 230, 145) 0%,rgb(0, 229, 146) 9.1%,rgb(0, 226, 150) 16.8%,rgb(0, 221, 156) 23.5%,rgb(0, 214, 163) 29.2%,rgb(0, 206, 171) 34.4%,rgb(0, 197, 180) 39.1%,rgb(0, 187, 188) 43.6%,rgb(0, 176, 196) 48.2%,rgb(0, 165, 204) 53%,rgb(0, 153, 209) 58.3%,rgb(0, 142, 218) 64.3%,rgb(0, 132, 223) 71.3%,rgb(0, 123, 227) 79.4%,rgb(0, 117, 229) 88.9%,rgb(0, 115, 230) 100%)"
                          },
                          children: ""
                        }
                      },
                      {
                        type: "div",
                        props: {
                          children: "oriverk.dev"
                        }
                      }
                    ]
                  }
                }
              ]
            },
          }
        ]
      },
    },
    options
  )

  const imgBuffer = await sharp(Buffer.from(svg))
    .toFormat("png", {
      quality: 75,
    })
    .toBuffer();
  
  return imgBuffer
}
