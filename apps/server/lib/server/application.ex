defmodule Server.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    port = Application.get_env(:server, :port)

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Server.Router, [], [port: port])
    ]

    Supervisor.start_link(children, [strategy: :one_for_one, name: Server.Supervisor])
  end
end
