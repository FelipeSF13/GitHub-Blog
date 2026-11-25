export const normalize = (s:string)=>s.trim().replace(/\s+/g,' ')
export function summary(body:string|null) {
  const plain=normalize((body??'').replace(/```[\s\S]*?(?:```|$)/g,' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[#*_`>]/g,''))
  return plain.length>170 ? plain.slice(0,167)+'…' : plain || 'Publicação sem resumo.'
}
export function relative(date:string) {
  const seconds=(Date.parse(date)-Date.now())/1000
  const units = [[31536000,'year'],[2592000,'month'],[86400,'day'],[3600,'hour'],[60,'minute']] as const
  for(const [size,unit] of units) if(Math.abs(seconds)>=size) return new Intl.RelativeTimeFormat('pt-BR').format(Math.trunc(seconds/size),unit)
  return 'agora'
}
