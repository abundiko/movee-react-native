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


