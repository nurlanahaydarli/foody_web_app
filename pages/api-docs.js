import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import paths from "../server/swanger/paths.json";

import "swagger-ui-react/swagger-ui.css";
import Head from "next/head";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

function ApiDoc({ spec }) {
  return (
    <>
      <Head>
        <title>Swanger | Foody App</title>
        <meta name="description" content="REST API for Foody APP" />
        <link
          rel="icon"
          href="https://w7.pngwing.com/pngs/713/936/png-transparent-online-shopping-shopping-cart-logo-e-commerce-market-blue-angle-company-thumbnail.png"
        />
      </Head>
      <div style={{ margin: "40px 0" }}>
        <SwaggerUI spec={spec} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Foody Swagger API",
        version: "1.0",
      },
      basePath: "https://foody-api.vercel.app/",
      paths,
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
