defmodule Store.Mixfile do
  use Mix.Project

  def project do
    [app: :store,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.4",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps(),
     aliases: [test: "test --no-start"]]
  end

  def application do
    # Specify extra applications you'll use from Erlang/Elixir
    [extra_applications: [:logger],
     mod: {Store, []}]
  end

  defp deps do
    [
      {:csv, "~> 1.4.2"},
      {:poison, "~> 3.0"}
    ]
  end
end
