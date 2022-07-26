import { Compiler, sources } from 'webpack'

export class DefineAfterBundleWebpackPlugin {
	replaceMapper: Record<string, any>

	constructor(replaceMapper: Record<string, any>) {
		this.replaceMapper = replaceMapper
	}

	apply(compiler: Compiler) {
		compiler.hooks.compilation.tap(DefineAfterBundleWebpackPlugin.name, compilation => {
			const { devtool } = compiler.options

			compilation.hooks.processAssets.tap(DefineAfterBundleWebpackPlugin.name, assets => {
				for (const index in assets) {
					const asset = compilation.getAsset(index)
					const source = asset.source

					const content = source.source().toString()

					const newSource = new sources.ConcatSource(
						Object.keys(this.replaceMapper).reduce(
							(updatedSource, toBeReplacedValue) =>
								updatedSource.replace(
									new RegExp(toBeReplacedValue, 'g'),
									this.replaceMapper[toBeReplacedValue],
								),
							content,
						),
					)

					compilation.updateAsset(
						index,
						devtool
							? new sources.SourceMapSource(
									newSource.source(),
									asset.name,
									source.sourceAndMap().map,
							  )
							: newSource,
					)
				}
			})
		})
	}
}
