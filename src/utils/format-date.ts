export function formatDate(dateString: string) : string {
    try {
        const date = dateString ? new Date(dateString) : new Date();
        
        if (isNaN(date.getTime()))
            throw new Error("Invalid date string");

        const formatter = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        return formatter.format(date);

    } catch (error) {
        console.error(`Error formatting date: ${dateString}`, error);
        return "Invalid date";
    }
}