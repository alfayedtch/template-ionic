import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  function isRouteInArray(array: any[], url: any, method: any) {
    return array.some(item => item.url === url && item.method === method);
}
  const endpoint = environment.endpoint;
  const urlsToNotUse = [
    { url: endpoint + '/login', method: 'POST' },
    { url: endpoint + '/register', method: 'POST'  },
    { url: endpoint + '/forgot-password', method: 'POST'  },
    { url: endpoint + '/reset-password', method: 'PUT'  },
    { url: endpoint + '/emailing/conference/accept', method: 'POST'  },
    { url: endpoint + '/emailing/conference/cancel', method: 'POST'  },
  ];
  // console.log(req.url);
  // console.log(req.method);
  // console.log(urlsToNotUse);
  //console.log(isRouteInArray(urlsToNotUse,req.url,req.method))
  if (isRouteInArray(urlsToNotUse,req.url,req.method)) {
  } else {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '')
      ),
    });
  }
  return next(req);
};
