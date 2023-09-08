export default function CourseLevel({ level }: { level: string }) {
    let typeClasses = ''
    switch (level) {
        case 'basico':
            typeClasses = 'text-blue-500'
            break
        case 'intermedio':
            typeClasses = 'text-yellow-500'
            break
        default:
            typeClasses = 'text-neutral-500'
            break
    }
    return (
        <span className={`text-sm font-normal tracking-wide capitalize ${typeClasses}`}>
            {level}
        </span>
    )
}