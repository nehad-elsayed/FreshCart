export function formatDate(isoString) {
    const date = new Date(isoString);

    // Get day, month, year, hours, and minutes
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Add ordinal suffix to the day
    const suffix = (d) => ['st', 'nd', 'rd'][(((d + 90) % 100 - 10) % 10) - 1] || 'th';

    return `${day}${suffix(day)} ${month} ${year} at ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// Example usage
console.log(formatDate("2025-01-28T07:43:34.200Z")); // Output: "28th January 2025 at 7:43 AM"
