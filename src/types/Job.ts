


export type Job = {
    id: string;
    logo_url: string;
    headline: string;
    occupation: {
        label: string;
    };
    employer: {
        name: string;
    };
    employment_type: {
        label: string;
    };
    working_hours_type: {
        label: string;
    };
    workplace_address: {
        city: string;
        street_address: string;
    };
    duration: {
        label: string;
    };
    application_deadline: string;
    application_details: {
        email: string;
    };
    description: {
        text: string;
    };
}
