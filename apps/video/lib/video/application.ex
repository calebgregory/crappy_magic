defmodule Video.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    port = Application.get_env(:video, :port)

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Video.Router, [], [port: port])
    ]

    opts = [strategy: :one_for_one, name: Video.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
