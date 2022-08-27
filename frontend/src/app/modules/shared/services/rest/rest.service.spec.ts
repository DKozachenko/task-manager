import { TestBed } from '@angular/core/testing';
import { RestService } from './rest.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

describe('RestService', () => {
  let service: RestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request by getAll method', () => {
    service.getAll<any>('test').subscribe();

    const req = httpTestingController.expectOne(`/${environment.apiUrl}/test`);

    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('should make GET request by getById method', () => {
    service.getById<any>('test', 'test_1').subscribe();

    const req = httpTestingController.expectOne(`/${environment.apiUrl}/test/test_1`);

    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('should make POST request by add method', () => {
    service.add<any>('test', {})
      .subscribe();

    const req = httpTestingController.expectOne(`/${environment.apiUrl}/test`);

    expect(req.request.method).toEqual('POST');
  });

  it('should make PUT request by updateById method', () => {
    service.updateById<any>('test', 'test_1', {}).subscribe();

    const req = httpTestingController.expectOne(`/${environment.apiUrl}/test/test_1`);

    expect(req.request.method).toEqual('PUT');
  });

  it('should make DELETE request by updateById method', () => {
    service.deleteById('test', 'test_1').subscribe();

    const req = httpTestingController.expectOne(`/${environment.apiUrl}/test/test_1`);

    expect(req.request.method).toEqual('DELETE');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
