defmodule Server.Router do
  use Plug.Router
  require Store.Bucket
  require Poison

  plug Plug.Logger
  plug :match
  plug :dispatch

  get "/item/:slug" do
    case Store.Bucket.get(Store.Bucket, slug) do
      {:ok, item} ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(200, Poison.encode!(item))
      _ ->
        send_resp(conn, 404, "No item found with slug #{slug}")
    end
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end