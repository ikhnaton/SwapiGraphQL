import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import fetch from "node-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `/graphql`,
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

let allPanetsButton = document.getElementById("allPlanets");

allPanetsButton.onclick = async () => {
    const value = document.getElementById("filterText").value;
    const result = await client.query({
        query: gql`
            query ($filterText: String)
            {
                planets(filter: $filterText)
                {
                    name
                    rotation_period
                    orbital_period
                    diameter
                    climate
                    gravity
                    terrain
                    surface_water
                    population
                    residents
                    films
                    created
                    edited
                    url
                }   
            }
        `,
        variables: {
            filterText: value || null
        }
    });

    const showMe = result.data.planets.map(item => {
        console.log(item);
        return "<tr>" + Object.keys(item).map(spec => spec !== '__typename' ? `<td>${item[spec]}</td>` : "").join("");
    }).join("") + "</tr>";
    
    document.getElementById("allResults").innerHTML = `<table><tr><th>name</th><th>rotation_period</th><th>orbital_period</th><th>diameter</th><th>climate</th><th>gravity</th><th>terrain</th><th>surface_water</th><th>population</th><th>residents</th><th>films</th><th>created</th><th>edited</th><th>url</th></tr>${showMe}</table>`;
}
