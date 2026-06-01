import cvPt from '@/data/cv-pt.json'
import cvEn from '@/data/cv-en.json'
import cvEs from '@/data/cv-es.json'
import cvFr from '@/data/cv-fr.json'
import CVContent from '@/components/CVContent'

const allCVs = { pt: cvPt, en: cvEn, es: cvEs, fr: cvFr }

export default function CVPage() {
  return <CVContent allCVs={allCVs} />
}
