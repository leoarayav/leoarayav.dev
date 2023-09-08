import moment from "moment"
import 'moment/locale/es'

export function formatDate(date: string) {
    const today = moment().startOf('day')
    const postDate = moment(date);
    const diffInDays = today.diff(postDate, 'days');

    if (diffInDays === 0) {
        return `${postDate.format('MMMM DD, YYYY')} (Hoy)`;
    } else {
        return `${postDate.format('MMMM DD, YYYY')} | ${diffInDays}d atrás`;
    }
}