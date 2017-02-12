defmodule Video.Router do
  use Plug.Router

  plug Plug.Logger
  plug :match
  plug :dispatch

  @doc"""
  Serves video from file storage if exists; otherwise, returns 404.
  """
  get "/videos/:slug" do
    video_file = "#{slug}.mp4"
    file_path = Path.join(Application.get_env(:video, :vid_dir), video_file)

    if File.exists?(file_path) do
      size = get_file_size(file_path)

      conn
      |> put_resp_content_type("application/vnd.apple.mpegurl")
      |> put_resp_header("Content-Length", "#{size}")
      |> send_file(200, file_path)
    else
      send_resp(conn, 404, "No video found for slug #{slug}")
    end
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end

  defp get_file_size(path) do
    {:ok, %{size: size}} = File.stat(path)

    size
  end
end
