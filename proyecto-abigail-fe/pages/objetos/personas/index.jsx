import Button from "components/Button";
import { SendIcon } from "components/Icons";
import InputControlled from "components/InputControlled";
import Layout from "components/Layout";

import ListBoxOptions from "components/ListBoxOptions";
import Loader from "components/Loader";
import { ESTADOS_CIVILES } from "constants/ESTADOS_CIVILES";
import { ETNIAS } from "constants/ETNIAS";
import { GENEROS } from "constants/GENEROS";
import { useState } from "react";
import styles from "./styles.module.css";

const INPUT_DATA = [
  {
    id: "input_data_1",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Ingrese el nombre de la persona",
    maxLength: "100",
    required: true,
  },
  {
    id: "input_data_2",
    label: "Apellidos",
    type: "text",
    name: "apellido",
    placeholder: "Ingrese el apellido de la persona",
    maxLength: "100",
    required: true,
  },
  {
    id: "input_data_3",
    label: "Fecha de nacimiento",
    type: "date",
    name: "fecha_Nacimiento",
    placeholder: "Fecha de nacimiento",
    maxLength: "100",
    required: true,
  },
  {
    id: "input_data_4",
    label: "Teléfono",
    type: "tel",
    name: "telefono",
    placeholder: "Ej: 12345678",
    maxLength: "100",
    required: true,
  },
  {
    id: "input_data_5",
    label: "CUI",
    type: "number",
    name: "cui",
    placeholder: "Ej: 1234567890123",
    maxLength: "13",
    required: true,
  },
];

export default function Personas({ currentPage = false }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData);
    // console.log(data);
    // const { nombre, apellido, cui, fecha_Nacimiento, telefono } = data;
    // const estado_Civil_Id = data["estado_Civil_Id[id]"];
    // const etnia_Id = data["etnia_Id[id]"];
    // const genero_Id = data["genero_Id[id]"];
    setLoading(false);
  };

  return (
    <Layout currentPage={currentPage}>
      <h2>Registrar personas</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* INPUTS: */}
        <div className={styles.containerInputsText}>
          {INPUT_DATA.map(({ id, label, type, name, placeholder, maxLength, required }) => {
            return (
              <div key={id}>
                <InputControlled
                  label={label}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  required={required}
                />
              </div>
            );
          })}
        </div>

        <ListBoxOptions data={GENEROS} name="genero_Id" label="Género" />
        <ListBoxOptions data={ESTADOS_CIVILES} name="estado_Civil_Id" label="Estado civil" />
        <ListBoxOptions data={ETNIAS} name="etnia_Id" label="Etnia" />

        {/* BOTÓN SUBMIT */}
        <div>
          <Button type="submit">
            Registrar
            <SendIcon />
          </Button>
        </div>
      </form>
      {loading && <Loader />}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { currentPage: context.resolvedUrl },
  };
}
