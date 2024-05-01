import React,{useState} from 'react'
import NumericInput from '../SanReq/NumericInput';

const OccupancyTypes = [ //Model Building Bye-Laws (2016)
  {value:"1", label: "1. Residential"},
  {value:"2", label: "2. Commercial"},
  {value:"3", label: "3. SocioCulturalFacilities"},
  {value:"4", label: "4. PublicSemiPublic"},
  {value:"5", label: "5. Industry"},
];
const OccupancyTypesResidential=[
 {value:1, label:"Residential Plot - Group Housing"},
 {value:2, label:"Hostel / Guest House /Lodging & Boarding House / Dharamshala"},
 {value:3, label:"Night Shelter"},
 {value:4, label:"Studio Apartments"},
 {value:5, label:"State Bhawans/ State Guest houses"},
];
const OccupancyTypesCommercial=[
  {value:1, label:"Community Centre / Non- hierarchical Commercial Centre"},
  {value:2, label:"District Centre/ Sub-Central Business District/ Sub- City Level Commercial areas"},
  {value:3, label:"Retail & Commerce Metropolitan City Centre i.e. Connaught Place & its Extension"},
  {value:4, label:"Commercial Complex at Fire Brigade Lane and Janpath Lane"},
  {value:5, label:"Hotels"},
  {value:6, label:"Service Apartments"},
  {value:7, label:"Asaf Ali Road (the area shown as commercial strip in Delhi Gate - Ajmeri Gate scheme)"},
 ];
 const OccupancyTypesSocioCulturalFacilities=[
  {value:1, label:"Multipurpose Community Hall"},
  {value:2, label:"Banquet Hall"},
  {value:3, label:"Community Recreational Club (Auditorium)"},
  {value:4, label:"Recreational Club"},
  {value:5, label:"Exhibition-cum - Fair Ground"},
  {value:6, label:"Science Centre"},
  {value:7, label:"International Convention Centre"},
  {value:8, label:"Socio-Cultural Centre"},
 ];
 const OccupancyTypesPublicSemiPublic=[
  {value:1, label:"Hospital / Tertiary Health Care Centre"},
  {value:2, label:"Maternity Home Nursing Home / Polyclinic / Dispensary"},
  {value:3, label:"Family Welfare Centre Paediatric Centre Geriatric Centre Diagnostic Centre"},
  {value:4, label:"Veterinary Hospital for pet animals and birds"},
  {value:5, label:"Dispensary for pet animals and birds"},
  {value:6, label:"Medical College"},
  {value:7, label:"Nursing and Paramedic Institute"},
  {value:8, label:"Veterinary Institute"},
  {value:9, label:"Coaching Centre"},
  {value:10, label:"College / University"},
  {value:11, label:"District Court, Integrated Office Complex, Government Offices"},
 ];

const ParkingNormsDelhi = () => {

}

export default ParkingNormsDelhi
