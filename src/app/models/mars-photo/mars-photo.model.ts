export interface IMarsPhoto {
  camera: ICamera;
  rover: IRover;
  earth_date: string;
  id: number;
  img_src: string;
}

interface ICamera {
  full_name: string;
  id: number;
  name: string;
  rover_id: number;
}

interface IRover {
  "id": number;
  "name": string;
  "landing_date": string;
  "launch_date": string;
  "status": string;
}
