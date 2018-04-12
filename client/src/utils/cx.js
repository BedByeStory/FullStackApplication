export default function (clazzes) {
  if (typeof clazzes === 'string') return clazzes
  if (Array.isArray(clazzes)) return clazzes.join(' ')
  return Object.keys(clazzes || {})
  .filter(clazz => clazz && clazzes[clazz])
  .join(' ')
}
