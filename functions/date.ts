import { AppSelectOptions } from '@/components/formComponents/AppSelect';
import { format, isYesterday, isBefore, differenceInHours, subDays, formatDistanceToNow } from 'date-fns';

export function formatDate(dateString: string): string {
  const now = new Date();
  const yesterday = subDays(now, 1);

  const date = new Date(dateString);
  if (isBefore(date, yesterday)) {
    return format(date, 'd MMM yyyy');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    const hoursAgo = differenceInHours(now, date);
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  }
}

export function formatDateReadable(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "unknown";
  }

  return format(date, "d MMMM, yyyy");
}

export function formatDateTimeReadable(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "unknown";
  }

  return format(date, "d MMMM, yyyy h:mm a");
}

export function formatDateFromNow(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export function year1999TillDate():{
  title: string;
  value: string;
}[]{
const startDate = new Date('1999-01-01');
const now = new Date();
const years = [];

for (let year = startDate.getFullYear(); year <= now.getFullYear(); year++) {
  years.unshift(year.toString());
}

return [{title: "Recent", value: ''}, ...years.map(y=>({title:y, value:y}))];
}


