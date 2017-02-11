defmodule Store.Supervisor do
  use Supervisor

  def start_link(items) do
    Supervisor.start_link(__MODULE__, items)
  end

  def init(items) do
    children = [
      worker(Store.Registry, [Store.Registry]),
      supervisor(Store.Bucket.Supervisor, [items])
    ]

    supervise(children, strategy: :rest_for_one)
  end
end
