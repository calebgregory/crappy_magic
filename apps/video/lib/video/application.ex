defmodule Video.Application do
  @moduledoc false

  use Application

  @doc"""
  Callback called when video server application starts.
  """
  def start(_type, _args) do
    port = Application.get_env(:video, :port)
    IO.puts("Video server listening on http://localhost:#{port}")

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Video.Router, [], [port: port])
    ]

    opts = [strategy: :one_for_one, name: Video.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
