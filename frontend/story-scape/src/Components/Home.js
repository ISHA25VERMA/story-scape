import { React, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../Graphql/query/auth";

function Home() {
  const { error, loading, data } = useQuery(LOAD_USERS);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <div class="topNavigation">HOme</div>
    </div>
  );
}

export default Home;
