type Job = {
    "relevance": number | null,
    "id": string | null,
    "external_id": string | null,
    "original_id": string | null,
    "label": string[],
    "webpage_url": string | null,
    "logo_url": string | null,
    "headline": string | null,
    "application_deadline": string | null,
    "number_of_vacancies": number | null,
    "description": {
      "text": string | null, 
      "text_formatted": string | null, 
      "company_information": string | null,
      "needs": string | null,
      "requirements": null,
      "conditions": string | null,
    },
    "employment_type": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "salary_type": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "salary_description": string | null,
    "duration": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "working_hours_type": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "scope_of_work": {
      "min": number | null,
      "max": number | null
    },
    "access": string | null,
    "employer": {
      "phone_number": string | null,
      "email": string | null,
      "url": string | null,
      "organization_number": string | null,
      "name": string | null,
      "workplace": string | null,
    },
    "application_details": {
      "information": string | null,
      "reference": string | null,
      "email": string | null,
      "via_af": boolean,
      "url": string | null,
      "other": string | null,
    },
    "experience_required": boolean,
    "access_to_own_car": boolean,
    "driving_license_required": boolean,
    "driving_license": boolean,
    "occupation": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "occupation_group": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "occupation_field": {
      "concept_id": string | null,
      "label": string | null,
      "legacy_ams_taxonomy_id": string | null,
    },
    "workplace_address": {
      "municipality": string | null,
      "municipality_code": string | null,
      "municipality_concept_id": string | null,
      "region": string | null,
      "region_code": string | null,
      "region_concept_id": string | null,
      "country": string | null,
      "country_code": string | null,
      "country_concept_id": string | null,
      "street_address": string | null,
      "postcode": string | null,
      "city": string | null,
      "coordinates": [number, number]
    },
    "must_have": {
      "skills": string[],
      "languages": string[],
      "work_experiences": string[],
      "education": string[],
      "education_level": string[]
    },
    "nice_to_have": {
      "skills": string[],
      "languages": string[],
      "work_experiences": string[],
      "education": string[],
      "education_level": string[]
    },
    "application_contacts": [
      {
        "name": string | null,
        "description": string | null,
        "email": string | null,
        "telephone": string | null,
        "contact_type": string | null,
      }
    ],
    "publication_date": string | null,
    "last_publication_date": string | null,
    "removed": boolean,
    "removed_date": string | null,
    "source_type": string | null,
    "timestamp": number | null,
}

export default Job





  /* 
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
  */