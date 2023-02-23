import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Form from "../components/Form";
import List from "../components/List";

function Home() {
  return (
    <Layout>
      <Header />
      <Form />
      <List />
    </Layout>
  );
}

export default Home;
