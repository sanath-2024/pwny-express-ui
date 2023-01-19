export interface ListReq {
  master_pw: string
};

export interface ListResp {
  names: string[]
};

export interface CreateReq {
  master_pw: string,
  name: string,
  value: string
};

export interface CreateResp { };

export interface GetReq {
  master_pw: string,
  name: string,
};

export interface GetResp {
  value: string
};

export interface UpdateReq {
  master_pw: string,
  name: string,
  value: string
};

export interface UpdateResp { };

export interface DeleteReq {
  master_pw: string,
  name: string,
};

export interface DeleteResp { };

export type Route = "/list" | "/create" | "/get" | "/update" | "/delete";

export const post = async <Req, Resp>(route: Route, data: Req): Promise<Resp> => {
  let request_object = Object.assign({}, data) as any;

  const resp = await fetch(route, { method: "post", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(request_object) });
  if (resp.ok)
    return await resp.json();
  else
    throw await resp.text();
}