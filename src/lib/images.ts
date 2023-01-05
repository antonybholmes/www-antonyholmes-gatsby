export function getImageMap(q: any) {
  const imageMap: any = {}

  q.nodes.forEach((file: { name: string }) => {
    imageMap[file.name] = file
  })

  return imageMap
}
