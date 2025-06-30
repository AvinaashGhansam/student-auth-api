export interface Sheet {
  professorId: string;
  professorFirstName: string | null;
  professorLastName: string | null;
  sheetId: string | null;
  className: string | null;
  dateCreated: Date | null;
  secretKey: {
    secret: string | null;
    location: {
      lat: number | null;
      lon: number | null;
    };
  };
  isActive: boolean;
}

export interface Logs {
  id: string;
  sheetId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  name: string | null;
  class: string | null;
  secretKey: {
    secret: string | null;
    location: {
      lat: number | null;
      lon: number | null;
    };
  };
}
