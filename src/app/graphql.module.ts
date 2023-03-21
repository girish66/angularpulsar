import {Apollo, APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ApolloLink, InMemoryCache} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {environment} from 'src/environments/environment';

const uri = `${environment.apiUrl}/graphql`;

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('currentUser');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({uri})]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
