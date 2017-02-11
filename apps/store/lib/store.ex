defmodule Store do
  use Application

  def start(_type, _args) do
    {:ok, items} = Store.Datasource.init
    Store.Bucket.Supervisor.start_link(items)
  end
end
