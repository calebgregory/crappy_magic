defmodule Video.Router do
  use Plug.Router

  plug Plug.Logger
  plug :match
  plug :dispatch

  get "/videos/:slug" do
    video_file = "#{slug}.mp4"
    file_path = Path.join(Application.get_env(:video, :vid_dir), video_file)
    if File.exists?(file_path) do
      offset = get_offset(conn.req_headers)
      size = get_file_size(file_path)

      conn
      |> put_resp_content_type("application/vnd.apple.mpegurl")
      |> put_resp_header("Accept-Ranges", "bytes")
      |> put_resp_header("Content-Length", "#{size}")
      |> put_resp_header("Content-Range", "bytes #{offset}-#{size-1}/#{size}")
      |> send_file(206, file_path, offset, size-offset)
    else
      send_resp(conn, 404, "No video found for slug #{slug}")
    end
  end

  defp get_file_size(path) do
    {:ok, %{size: size}} = File.stat(path)

    size
  end

  defp get_offset(headers) do
    case List.keyfind(headers, "range", 0) do
      {"range", "bytes=" <> start_pos} ->
        String.split(start_pos, "-")
        |> hd
        |> String.to_integer
      nil ->
        0
    end
  end
end
