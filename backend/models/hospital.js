import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
    hospitalemail: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    },
    status: {
        type: String,
        default: "Pending",
    },
    dateCreated: {
        type: String,
        default: new Date().toISOString(),
    },
});

hospitalSchema.methods.generateTimeSlots = function (intervalMinutes = 30) {
    const [start, end] = this.timing.split(" - ").map((time) => {
        const [timePart, ampm] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);
        if (ampm === "PM" && hours !== 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
        return { hours, minutes };
    });

    const startTime = new Date();
    startTime.setHours(start.hours, start.minutes, 0, 0);

    const endTime = new Date();
    endTime.setHours(end.hours, end.minutes, 0, 0);

    const slots = [];
    for (
        let time = startTime;
        time <= endTime;
        time.setMinutes(time.getMinutes() + intervalMinutes)
    ) {
        slots.push(
            `${time.getHours() % 12 || 12}:${String(time.getMinutes()).padStart(
                2,
                "0"
            )} ${time.getHours() < 12 ? "AM" : "PM"}`
        );
    }

    return slots;
};

export const Hospital = mongoose.model("Hospital", hospitalSchema);
