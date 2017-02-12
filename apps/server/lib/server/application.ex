defmodule Server.Application do
  @moduledoc false

  use Application

  @doc"""
  Callback called when item server application starts.
  """
  def start(_type, _args) do
    port = Application.get_env(:server, :port)
    IO.puts("Item server listening on http://localhost:#{port}")

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Server.Router, [], [port: port])
    ]

    Supervisor.start_link(children, [strategy: :one_for_one, name: Server.Supervisor])
  end
end
